import { UserDTO } from "src/domain/dtos/UserDTO";
import { UserResponse } from "src/application/dtos/response/UserResponse";

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