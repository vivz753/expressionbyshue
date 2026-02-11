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
      description: 'Preferably webp, png, or jpg format (in that order)',
    }),
    defineField({
      name: 'dimensions',
      description: 'units are assumed to be inches e.g. 11x14',
      type: 'string',
      options: {
        list: [
          '5x7',
          '11x14',
          '16x20',
          '16x24',
          '24x30',
          '24x36',
          '30x45',
          '32x40',
        ],
        layout: 'radio',
      }
    }),
    defineField({
      name: 'hidden',
      description: 'Check this if you do not want this art work to be displayed on the website',
      type: 'boolean'
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Display Only', value: 'displayOnly'},
          {title: 'Reserved', value: 'reserved'},
          {title: 'For Sale', value: 'forSale'},
          {title: 'Sold', value: 'sold'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
      description:
        'Multiply by 100 e.g. for $1, the price here would be 100, $99 would be 9900, etc.',
      hidden: ({document}) => document?.availability !== 'forSale',
    }),
    defineField({
      name: 'framed',
      type: 'boolean',
      hidden: ({document}) => document?.availability !== 'forSale',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Charcoal', value: 'charcoal'},
          {title: 'Oil', value: 'oil'},
          {title: 'Acrylic', value: 'acrylic'},
          {title: 'Watercolor', value: 'watercolor'},
          {title: 'Watercolor Pencils', value: 'watercolorPencils'},
        ]
      },
    }),
    defineField({
      name: 'support',
      type: 'string',
      options: {
        list: ['canvas', 'paper', 'board', 'linen', 'panel'],
      },
    }),
    defineField({
      name: 'genre',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'portrait',
          'landscape',
          'seascape',
          'cityscape',
          'still life',
          'narrative',
        ],
      },
    }),
    defineField({
      name: 'style',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['traditional', 'impressionism', 'expressionism', 'abstract'],
      },
    }),
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: ['portrait', 'landscape', 'square', 'round/oval'],
      },
    }),
    defineField({
      name: 'dominantColor',
      type: 'string',
      options: {
        list: [
          {title: "Warm Palette", value: "warmPalette"},
          {title: "Cold Palette", value: "coldPalette"},
          {title: "Yellow Dominant", value: "yellowDominant"},
          {title: "Red Dominant", value: "redDominant"},
          {title: "Blue Dominant", value: "blueDominant"},
          {title: "Monochrome", value: "monochrome"},
        ],
      },
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      description: 'subject matter or whatever searchable key you want to add e.g. animal, NSFW, etc.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
