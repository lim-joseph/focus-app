import { setSeederFactory } from 'typeorm-extension';

import { UserEntity } from 'src/user/user.entity';

export default setSeederFactory(UserEntity, (faker) => {
    const user = new UserEntity();

    user.name = faker.person.firstName()
    user.email = faker.internet.email()
    user.password = faker.internet.password().toString();


    return user;
});