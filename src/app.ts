import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import express from 'express';
import { authMiddleware } from './shared/middlewares/auth.middleware';
import { authRouter } from './infra/routes/auth.route';
import { organizationRouter } from './infra/routes/organization.route';
import { companyRouter } from './infra/routes/company.route';
import { roleRouter } from './infra/routes/role.route';
import { storedFileRouter } from './infra/routes/stored-file.route';
import { userRouter } from './infra/routes/user.route';
import swaggerFile from './infra/config/swagger-output.json';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authMiddleware);

app.use(authRouter);
app.use(storedFileRouter);
app.use(roleRouter);
app.use(organizationRouter);
app.use(companyRouter);
app.use(userRouter);
