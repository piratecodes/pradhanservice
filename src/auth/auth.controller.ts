import { Controller, Post, Body, Get, Patch, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetupAdminDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('setup')
  @HttpCode(HttpStatus.CREATED)
  async setupFirstAdmin(@Body() dto: SetupAdminDto) {
    const data = await this.authService.setupFirstAdmin(dto);
    return { success: true, message: 'Super Admin created successfully!', data };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return { success: true, message: 'Logged in successfully', data };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getMe(@GetUser() user: any) {
    return { success: true, message: 'User is logged in', data: { admin: user } };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const data = await this.authService.forgotPassword(dto);
    return { success: true, message: 'Token sent to email!', data };
  }

  @Patch('reset-password/:token')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Param('token') token: string, @Body() dto: ResetPasswordDto) {
    const data = await this.authService.resetPassword(token, dto);
    return { success: true, message: 'Password reset successful. You are now logged in.', data };
  }
}
