import {GptMessage} from "@/models/gpt";

export default function ChatBlock(
    props: {
        message: GptMessage,
    }
) {


    return (
        <div
            style={{
                backgroundColor: props.message.role === "user" ? "transparent" : "#e0e0e0"

            }}
            className={"p-4 justify-center i text-base md:gap-6 md:py-6 "}>
            <div
                className={"flex flex-1 gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl }"}>

                <div className={"flex flex-col flex-shrink-0 w-[100px]"}>
                    {
                        props.message.role

                    }
                    <div>
                        {
                            `length:${props.message.content.length}`
                        }
                    </div>
                </div>
                <div>
                    {
                        props.message.content.split("\n").map((line, index) => {
                            return (
                                <div key={index}>
                                    &nbsp;{`${line}`}
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    )


}