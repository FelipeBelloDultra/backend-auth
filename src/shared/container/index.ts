// Package
import { container } from "tsyringe";

// User repository
import { IUserRepository } from "@/modules/users/repositories/user-repository";
import { UserRepository } from "@/modules/users/infra/database/repositories/user-repository";

// Hash provider
import { IHashProvider } from "../providers/hash-provider";
import { HashProvider } from "../providers/hash-provider/implementations/hash-provider";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IHashProvider>("HashProvider", HashProvider);
