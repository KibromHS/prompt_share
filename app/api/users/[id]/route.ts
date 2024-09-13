import User from "@models/user";
import { connectToDB } from "@utils/database"

export const GET = async (req: Request, { params }: { params: { [key: string]: string }}) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        return new Response(JSON.stringify(user), { status: 200 });

    } catch (e) {
        return new Response('Unable to get prompt', { status: 500 });
    }
}