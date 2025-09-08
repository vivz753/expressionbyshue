import { defineField, defineType } from 'sanity'

export const artWork = defineType({
  name: 'artWork',
  title: 'Art Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Must be in JPG or PNG format',
    }),
    defineField({
      name: 'dimensions',
      description: 'e.g. 11x14"',
      type: 'string',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Display Only', value: 'displayOnly'},
          {title: 'For Sale', value: 'forSale'},
          {title: 'Sold Out', value: 'soldOut'},
        ],
        layout: 'radio'
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
      description: 'Multiply by 100 e.g. for $1, the price here would be 100, $99 would be 9900, etc.',
      hidden: ({document}) => document?.availability !== 'forSale'
    }),
    defineField({
      name: 'framed',
      type: 'boolean',
      hidden: ({document}) => document?.availability !== 'forSale'
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'array',
      of: [{type: 'string'}],
      options: {
          list: ['charcoal', 'oil', 'acrylic', 'watercolor'],
      },
    }),
    defineField({
      name: 'genre',
      type: 'array',
      of: [{type: 'string'}],
      options: {
          list: ['hollywood', 'impressionist', 'abstract', 'traditional'],
      },
    }),
    defineField({
      name: 'tags',
      description: 'e.g. portrait, landscape, animal, NSFW, etc.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
  ],
})