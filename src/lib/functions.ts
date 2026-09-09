
type ImageURL = {
    url: string
    size: 'sm' | 'md' | 'lg' | 'xl' 
}

const imageBaseUrl = import.meta.env.IMAGE_URL

export const getImageURL = (url: ImageURL['url'], size: ImageURL['size']) => {
    const sizes = [
        {
            key: 'sm',
            size: 'w92'
        },
        {
            key: 'md',
            size: 'w185'
        },
        {
            key: 'lg',
            size: 'w500'
        },
        {
            key: 'xl',
            size: 'w780'
        }
    ]

    const selectedSize = sizes.find(item => item.key === size);


    const imageUrl = `${imageBaseUrl}${selectedSize?.size ?? "w500"}/${url}`

    return imageUrl


}