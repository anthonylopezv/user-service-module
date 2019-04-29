import { Module, DynamicModule } from '@nestjs/common';

import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  static forRoot(options?): DynamicModule {
    const { host, port } = options;
    return {
      module: UserModule,
      imports: [
        ClientsModule.register([
          {
            name: 'USER_SERVICE',
            transport: Transport.TCP,
            options: {
              host,
              port
            },
          },
        ]),
      ],
    };
  }
}
