import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'
import { BannerEntity } from '../models/banner'

@Pipe({
    name: 'bannerContent',
})
export class BannerContentPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}

    transform(value: BannerEntity[] | undefined) {
        return value?.map((banner) => ({
            ...banner,
            startDate: this.datePipe.transform(banner.startDate, 'yyyy-MM-dd') ?? '',
            endDate: this.datePipe.transform(banner.endDate, 'yyyy-MM-dd') ?? '',
        }))
    }
}
