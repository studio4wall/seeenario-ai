import {IdentityVerification, Subscription, User} from ".prisma/client";
import {NestedSubscription} from "@/interfaces/nestedPrismaModels";
import {Role} from "@prisma/client";


declare module "next-auth" {
	interface Session {
		user?: (User & {
			role : Role
		}
		) | null;
	}

}