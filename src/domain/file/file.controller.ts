import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../application/auth/decorators/roles.decorator';
import { Role } from '../../application/auth/dto/role.enum';

@Controller()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @ApiTags('어드민')
    @ApiOperation({
        summary: '상품 썸네일 등록',
        description: '상품의 썸네일 이미지 하나를 등록합니다.',
    })
    @Post('upload/product/thumbnail')
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 201,
                },
                success: {
                    type: 'boolean',
                    example: true,
                },
                data: {
                    type: 'string',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingleFile(
        @UploadedFile()
        file: Express.Multer.File,
    ): Promise<string> {
        return this.fileService.singleUpload(file, 'products/images');
    }

    @ApiTags('어드민')
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '상품 이미지 등록',
        description: '상품의 이미지 여러개를 등록합니다.',
    })
    @Post('upload/product/images')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array', //  array of files
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 201,
                },
                success: {
                    type: 'boolean',
                    example: true,
                },
                data: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
        },
    })
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<string[]> {
        return this.fileService.arrayUpload(files, 'products/images');
    }
}
