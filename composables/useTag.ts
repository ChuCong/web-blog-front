import { tagStore } from "~/store/tag";
import { messageSuccess, messageError } from '~/common/message.service';
import type { ApiResponse, Tag, TagType } from '~/models';

interface State {
    tag: Tag,
    tags: Tag[],
    groupedTags: TagType[]
}

export function useTag() {
    const state: State = reactive({
        tag: useState<Tag>('tag', () => ({} as Tag)),
        tags: useState<Tag[]>('tags', () => []),
        groupedTags: useState<TagType[]>('groupedTags', () => [])
    })

    const tag_store = tagStore()
    const fetchTags = async (params: any) => {
        const response: ApiResponse<Tag[]> = await tag_store.fetchTags(params);
        if (response && response.status) {
            state.tags.splice(0);
            state.tags.push(...response.data);
            const groups: Record<number, TagType> = {}
            state.tags.forEach(tag => {
                if (!groups[tag.tag_type_id]) {
                    groups[tag.tag_type_id] = {
                        id: tag.tag_type_id,
                        name: tag.tag_type?.name || '',
                        tags: [],
                        open: true
                    }
                }
                const { tag_type, ...tagWithoutType } = tag
                groups[tag.tag_type_id].tags!.push(tagWithoutType)
            })
            state.groupedTags = Object.values(groups)
        }
    }

    return {
        state,
        fetchTags
    }

}