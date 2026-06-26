import { Injectable, ForbiddenException, BadRequestException, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { SetupAdminDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private signToken(id: number): string {
    return this.jwtService.sign({ id });
  }

  async setupFirstAdmin(dto: SetupAdminDto) {
    const adminExists = await this.prisma.admin.findFirst();
    if (adminExists) {
      throw new ForbiddenException('An admin already exists. Please log in.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const newAdmin = await this.prisma.admin.create({
      data: {
        name: dto.name,
        username: dto.username,
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        designation: 'Founder / CEO',
      },
    });

    const { password, ...adminData } = newAdmin;
    return { admin: adminData };
  }

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { username: dto.username },
    });

    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    if (!admin.isActive) {
      throw new ForbiddenException('This account has been deactivated. Contact the Super Admin.');
    }

    const token = this.signToken(admin.id);
    const { password, ...adminData } = admin;

    return { token, admin: adminData };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin) {
      throw new NotFoundException('There is no user with that email address.');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    });

    // We can add the email logic later or send it to an Email service here
    // For now returning the URL so you can test it
    const adminUrl = process.env.ADMIN_PANEL_URL || 'http://localhost:5173';
    const resetURL = `${adminUrl}/reset-password/${resetToken}`;
    
    return { message: 'Token sent to email! (Mocked)', resetURL };
  }

  async resetPassword(token: string, dto: ResetPasswordDto) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await this.prisma.admin.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!admin) {
      throw new BadRequestException('Token is invalid or has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const updatedAdmin = await this.prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    const jwtToken = this.signToken(updatedAdmin.id);
    const { password: pw, ...adminData } = updatedAdmin;

    return { token: jwtToken, admin: adminData };
  }
}
