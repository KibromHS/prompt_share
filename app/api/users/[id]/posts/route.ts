import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET = async (req: Request, { params }: { params: { [key: string]: string }}) => {
    try {
        await connectToDB();

        const posts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (e) {
        return new Response('Unable to get prompts', { status: 500 });
    }
}