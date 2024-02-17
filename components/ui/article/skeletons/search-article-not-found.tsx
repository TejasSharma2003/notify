import { EmptyPlaceholder } from "@/components/empty-placeholder";

export default function SearchArticleNotFound() {
    return (
        <EmptyPlaceholder className="border-none">
            <EmptyPlaceholder.Icon name="warning" />
            <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
                Sorry, we couldn't find any results matching your search
            </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
    )
}
