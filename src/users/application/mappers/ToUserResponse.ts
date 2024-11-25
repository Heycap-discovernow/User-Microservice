import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UserResponse } from "src/users/application/dtos/response/UserResponse";

export class ToUserResponse {
    public static toUserResponse(user: UserDTO): UserResponse {
        return new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.phone_verified,
            user.avatar
        );
    }
}