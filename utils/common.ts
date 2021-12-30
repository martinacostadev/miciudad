    /*    
    *    @param string // 2021-12-10T22:16:17.812Z
    *    @return string // 1/2/2022 0:00:00
    */
export function convertDate(date: string) {
    return new Date(date).toLocaleString()
}