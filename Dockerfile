FROM public.ecr.aws/lambda/nodejs:18 as builder

WORKDIR /usr/app
COPY package*.json tsconfig.json tsconfig.build.json /src ./
COPY /prisma ./
RUN npm install
RUN npm run prisma:generate
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/* ./
CMD [ "dist/lambda.handler" ]

