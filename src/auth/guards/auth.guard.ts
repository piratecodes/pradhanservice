import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('You are not logged in! Please log in to get access.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const currentUser = await this.prisma.admin.findUnique({
        where: { id: payload.id },
      });

      if (!currentUser) {
        throw new UnauthorizedException('The user belonging to this token no longer exists.');
      }

      if (!currentUser.isActive) {
        throw new UnauthorizedException('This user account is deactivated.');
      }

      request.user = currentUser;
    } catch {
      throw new UnauthorizedException('You are not logged in! Please log in to get access.');
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
