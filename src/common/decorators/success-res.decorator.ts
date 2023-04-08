import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiMultipleDataResponse = <T extends Type<any>>(
    status: HttpStatus,
    dto: T,
) => {
    return applyDecorators(
        ApiExtraModels(dto),
        ApiResponse({
            status: status,
            schema: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: status,
                    },
                    message: {
                        type: 'string',
                        example: 'Success',
                    },
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(dto) },
                    },
                    timestamp: {
                        type: 'date',
                        example: Date.now(),
                    },
                    // pagination: {
                    //     type: 'object',
                    //     $ref: getSchemaPath(PaginationDto),
                    // }
                },
            },
        }),
    );
};

export const ApiSingleDataResponse = <T extends Type<any>>(
    status: HttpStatus,
    dto: T,
) => {
    return applyDecorators(
        ApiExtraModels(dto),
        ApiResponse({
            status: status,
            schema: {
                properties: {
                    code: {
                        type: 'number',
                        example: status,
                    },
                    message: {
                        type: 'string',
                        example: 'Success',
                    },
                    data: {
                        type: 'object',
                        $ref: getSchemaPath(dto),
                    },
                    timestamp: {
                        type: 'date',
                        example: Date.now(),
                    },
                },
            },
        }),
    );
};

// export const ApiEmptyDataResponse = (status: HttpStatus = HttpStatus.OK) => {
//     return applyDecorators(
//       ApiResponse({
//           status,
//           schema: {
//               type: 'object',
//               properties: {
//                   status: {
//                       type: 'number',
//                       enum: Object.values(HttpStatus),
//                       example: status,
//                   },
//                   message: {
//                       type: 'string',
//                       example: isSuccessHttpStatus(status)
//                         ? 'Successful'
//                         : 'Failed',
//                   },
//               },
//           },
//       }),
//     );
// };
