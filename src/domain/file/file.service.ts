import { BadRequestException, Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

@Injectable()
export class FileService {
    private s3 = new AWS.S3();
    async singleUpload(file: Express.Multer.File, path: string) {
        try {
            return this.uploadS3(
                file.buffer,
                `product-image-${
                    process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'
                }`,
                file.originalname,
                path,
            );
        } catch (e) {
            throw e;
        }
    }

    async arrayUpload(files: Array<Express.Multer.File>, path: string) {
        if (Array.isArray(files)) {
            const uploadPromises = [];
            for (const [index, file] of files.entries()) {
                const upload = this.uploadS3(
                    file.buffer,
                    `product-image-${
                        process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'
                    }`,
                    file.originalname,
                    path,
                );
                uploadPromises.push(upload);
            }
            return Promise.all(uploadPromises).then((res) => {
                return res;
            });
        }
        throw new BadRequestException('Files must be an Array');
    }

    public async uploadS3(
        file: Buffer,
        bucket: string,
        name: string,
        path: string,
    ) {
        const params = {
            Bucket: bucket,
            Key: `${path}/${Date.now().toString()} - ${name}`,
            Body: file,
            ACL: 'public-read',
        };
        return (await this.s3.upload(params).promise()).Location;
    }
}
