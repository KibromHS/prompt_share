import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET = async (req: Request, { params }: { params: { [key: string]: string }}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id);

        if (!prompt) return new Response('Prompt not found!', { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (e) {
        return new Response('Unable to get prompt', { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: { params: { [key: string]: string }}) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const oldPrompt = await Prompt.findById(params.id);

        if (!oldPrompt) return new Response('Prompt not found!', { status: 404 });

        oldPrompt.prompt = prompt;
        oldPrompt.tag = tag;
        await oldPrompt.save();

        return new Response(JSON.stringify(oldPrompt), { status: 200 });
    } catch (e) {
        return new Response('Unable to edit prompt', { status: 500 });
    }
}

export const DELETE = async (req: Request, { params }: { params: { [key: string]: string }}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response('Successfully deleted prompt', { status: 200 });
    } catch (e) {
        return new Response('Unable to delete prompt', { status: 500 });
    }
}