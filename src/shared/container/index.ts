// Package
import { container } from "tsyringe";

// User repositoy
import { IUserRepository } from "@/modules/users/repositories/user-repository";
import { UserRepository } from "@/modules/users/infra/database/repositories/user-repository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
