const endpoint = "\thttps://api.openai.com/v1/chat/completions";
const apiKey = process.env.OPENAI_API_KEY ?? "";
const gptModel = "gpt-4";
import OpenAI from 'openai';

export type GptMessage = {
    role: "user" | "assistant" | "system";
    content: string;
}

export const openai = new OpenAI(
    {apiKey: apiKey});

export class GPT4 {
    static async sendRequest (prompt: GptMessage[] | GptMessage) {

        const messages = Array.isArray(prompt) ? prompt : [prompt];

        const response = openai.chat.completions.create({
            model: gptModel,
            messages: messages,
            stream: true,
        });

        return response;

    }


    static async convertScriptToNovel(script : string) {

        const messages : GptMessage[] = [];

        messages.push(
            {
                role: "user",
                content: "너는 대본을 소설로 바꾸는 일을 해야해. " +
                    "" +
                    "씬의 사이에는 ******로 구분을 해줘. " +
                    "대화는 문단과 함께 쓰지말고 줄 바꿈으로 구분해줘. " +
                    "읽는 사람이 대본인지 알지 못하도록 해야해" +
                    "너는 대답하지말고 대본을 소설로 바꾼것만 출력해" +
                    "1인칭 시점으로 써줘" +
                    "\n" +
                    "다음은 대본이야. " +
                    "\n" +
                    script
            }
        )

        return this.sendRequest(messages);

    }

}