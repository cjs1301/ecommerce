import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBearerAuth,
    ApiExcludeEndpoint,
    ApiHeader,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Role } from './dto/role.enum';
import { AuthService } from './auth.service';
import { JwtPayload, PassportUser } from './dto/auth.interface';
import { Roles } from '@application/auth/decorators/roles.decorator';
import { User } from './decorators/user.decorator';
import { ApiSingleDataResponse } from '@common/decorators/success-res.decorator';
import { AdminLoginResDto } from './dto/admin-login.res.dto';
import { AdminLoginDto } from '@application/auth/dto/admin-login.dto';
import { CreateAdminDto } from '@application/auth/dto/create-admin.dto';

@ApiTags('로그인')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: '네이버 로그인',
        description:
            '### 네이버 로그인을 하는 API입니다. \n' +
            `성공시 /login/success?code={jwt} 으로 리다이렉트 됩니다`,
    })
    @UseGuards(AuthGuard('naver'))
    @Get('naver')
    async naverLogin() {
        return;
    }

    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('naver'))
    @Get('naver/callback')
    async naverCallback(@Req() req: Request, @Res() res: Response) {
        return await this.authService.oauthCallback(req, res);
    }

    @ApiOperation({
        summary: '카카오 로그인',
        description:
            '### 카카오 로그인을 하는 API입니다.\n' +
            `성공시 /login/success?code={jwt} 으로 리다이렉트 됩니다`,
    })
    @UseGuards(AuthGuard('kakao'))
    @Get('kakao')
    async kakaoLogin() {
        return;
    }

    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('kakao'))
    @Get('kakao/callback')
    async kakaoCallback(@Req() req: Request, @Res() res: Response) {
        return this.authService.oauthCallback(req, res);
    }

    @ApiOperation({
        summary: '구글 로그인',
        description:
            '### 구글 로그인입니다.\n' +
            `성공시 /login/success?code={jwt} 으로 리다이렉트 됩니다`,
    })
    @UseGuards(AuthGuard('google'))
    @Get('google')
    async googleLogin() {
        return;
    }

    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleCallback(@Req() req: Request, @Res() res: Response) {
        return this.authService.oauthCallback(req, res);
    }

    @Post('admin/login')
    @ApiOperation({
        summary: '관리자 로그인',
        description: '관리자 로그인 입니다',
    })
    @ApiSingleDataResponse(200, AdminLoginResDto)
    async adminLogin(@Body() body: AdminLoginDto) {
        return this.authService.adminLogin(body);
    }

    /**
     * @description 회원탈퇴
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete('withdrawal')
    @Roles(Role.Customer)
    @ApiHeader({
        name: 'Bearer ',
    })
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '회원 탈퇴',
        description:
            '자물쇠 모양을 클릭하여 삭제하고자 하는 계정의 토큰값을 입력해주세요',
    })
    async withdrawal(@User() payload: JwtPayload) {
        return this.authService.customerWithdrawal(payload.sub);
    }

    @Post('admin/signup')
    @ApiOperation({
        summary: '어드민 회원 가입',
        description: '어드민 유저의 회원가입 입니다.',
    })
    async adminSignUp(@Body() body: CreateAdminDto) {
        return this.authService.adminSignUp(body);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiUnauthorizedResponse({
        status: 401,
        description: '활성화 되지 않은 회원일 경우, 없는 아이디인 경우',
    })
    @ApiOperation({
        summary: '로그인 확인',
        description: '로그인 여부를 확인합니다.',
    })
    async isAuthenticated(@User() user: PassportUser) {
        return user;
    }
}
