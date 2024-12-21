export type Hero = {
    id: number,
    name: string
    localized_name: string
    primary_attr: string
    attack_type: string
    roles: string[],
    img: string
    icon: string
}

export async function getHeroes(): Promise<Hero[]> {
    const response = await fetch('https://api.opendota.com/api/heroStats')
    const data = await response.json()

    return data
}