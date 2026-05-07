import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'الاسم',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'parent',
      title: 'التصنيف الرئيسي',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'اتركه فارغاً إذا كان هذا تصنيفاً رئيسياً',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      parent: 'parent.title',
    },
    prepare({ title, parent }) {
      return {
        title,
        subtitle: parent ? `← ${parent}` : 'تصنيف رئيسي',
      }
    },
  },
})