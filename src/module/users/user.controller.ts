import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller("user")
export class UserController {
         constructor(private readonly userService: UserService){}

         @Post()
         @HttpCode(HttpStatus.CREATED)
         createUser(@Body() userDto: CreateUserDto){
                  return this.userService.createUser(userDto);
         }

         @Post('login')
         @HttpCode(HttpStatus.OK)
         login(@Body() dto: UserLoginDto){
                  return this.userService.login(dto);
         }

         @Get()
         @UseGuards(RolesGuard)
         @Roles('ADMIN', 'SHOP_OWNER')
         findAllUsers(){
             return this.userService.findAllUsers();
         }

         @Get("brand")
         @UseGuards(RolesGuard)
         @Roles('CUSTOMER')
         findAllBrands(){
                  return this.userService.findAllProductBrand();
         }

         @Get("owner")
         @UseGuards(RolesGuard)
         @Roles("ADMIN")
         findAllShopOwner(){
            return this.userService.findAllShopOwner();
         }

         @Put("approve/:id")
         @UseGuards(RolesGuard)
         @Roles("ADMIN")
         approveOwner(@Param("id") id: string) {
            return this.userService.updateOwnerStatus(id);
         }
}