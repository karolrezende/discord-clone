import { Member, Profile, Server } from "@prisma/client";

export type ServeWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile})[]
}