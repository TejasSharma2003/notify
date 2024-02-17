import Blocks from 'editorjs-blocks-react-renderer';
import parse from 'html-react-parser';
import { cn } from '@/lib/utils';
import "../styles/article.css"

const heading = ({ data }: { data: { text: string, level: number } }) => {
    const { text, level } = data;
    if (level === 1) {
        return <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold ")}>{text}</h1 >
    } else if (level === 2) {
        return <h2 className={cn("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold  first:mt-0")}>{text}</h2 >
    } else if (level === 3) {
        return <h3 className={cn("mt-8 scroll-m-20 text-2xl font-semibold ")}>{text}</h3 >
    } else if (level === 4) {
        return <h4 className={cn("mt-8 scroll-m-20 text-xl font-semibold ")}>{text}</h4 >
    } else if (level === 5) {
        return <h4 className={cn("mt-8 scroll-m-20 text-lg font-semibold ")}>{text}</h4 >
    }
    return <h6 className="mt-8 scroll-m-20 text-base font-semibold ">{text}</h6>
}

const OrderedList = ({ items }: { items: string[] }) => {
    return (
        <ol className='ml-5 list-decimal text-[20px] marker:text-muted-foreground'>
            {items.map(item => <li className="mt-2">{parse(item)}</li>)}
        </ol>
    )
}

const UnorderedList = ({ items }: { items: string[] }) => {
    return (
        <ul className='ml-5 list-disc text-[20px] marker:text-muted-foreground'>
            {items.map(item => <li className="mt-2">{parse(item)}</li>)}
        </ul>
    )
}

const customRenders = {
    paragraph: ({ data }: { data: { text: string } }) => {
        const { text } = data;
        return <p className="text-[20px] font-normal text-base leading-8 [&:not(:first-child)]:mt-6 [&>a]:underline ">{parse(text)}</p>

    },
    header: heading,
    code: ({ data }: { data: { code: string } }) => {
        return <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border p-4">
            <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {data.code}
            </code>
        </pre>
    },
    list: ({ data }: { data: { style: "ordered" | "unordered", items: string[] } }) => {
        const { style, items } = data;
        if (style === "ordered") {
            return <OrderedList items={items} />
        }
        return <UnorderedList items={items} />
    },
    table: ({ data }: { data: { withHeadings: boolean, content: string[][] } }) => {
        const { withHeadings, content } = data;
        let rows = content;
        let headingContent;

        if (withHeadings) {
            headingContent = rows.shift()?.map((heading) => {
                return <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    {parse(heading)}
                </th>
            });
        }

        return (
            <div className="my-6 w-full overflow-y-auto">
                <table className='w-full'>
                    <tbody>
                        {withHeadings && <tr className="m-0 border-t p-0 even:bg-muted">
                            {headingContent}
                        </tr>}
                        {rows.map((row) => {
                            return <tr className="m-0 border-t p-0 even:bg-muted">
                                {row.map((content) => {
                                    return <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{parse(content)}</td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default function Content({ content }: { content: string }) {
    if (!content) {
        return <h1>Sorry something weng wrong.</h1>
    }

    const blocks = JSON.parse(content);
    return <Blocks data={blocks} renderers={customRenders} />
}

