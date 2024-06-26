const OmitMeta = ['createdAt', 'updatedAt', 'deletedAt'] as const;
export default Array.from(OmitMeta);
