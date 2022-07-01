export const TEXT_FIELDS = [
  {
    name: 'name',
    label: 'Item name',
    required: true,
    placeholder: 'Item name'
  },
  {
    name: 'externalLink',
    label: 'External Link',
    description:
      "We will include a link on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.",
    placeholder: 'https://your-gallery.com/item-name'
  },
  {
    name: 'description',
    label: 'Description',
    description: "The description will be included on the item's detail page underneath its image.",
    multiline: true,
    minRows: 4,
    placeholder: 'Provide a detailed description of your item.'
  }
];
