import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    Output,
} from '@angular/core'
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs'
import { BaseControlValueAccessor } from '../../shared/utils/BaseControlValueAccessor'

@Component({
    selector: 'banner-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SearchComponent,
            multi: true,
        },
    ],
})
export class SearchComponent
    extends BaseControlValueAccessor<string>
    implements OnDestroy
{
    @Output() focusIn = new EventEmitter<boolean>()
    @Output() searchFilter = new EventEmitter()
    searchControl = new FormControl('')
    endSubs$: Subject<void> = new Subject<void>()

    constructor() {
        super()
        this.searchValueChanges()
    }

    public override writeValue(obj: string): void {
        this.searchControl.setValue(obj)
    }

    onFocusIn(isFocused: boolean) {
        this.focusIn.emit(isFocused)
    }

    searchValueChanges() {
        this.searchControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(500), takeUntil(this.endSubs$))
            .subscribe((value) => {
                this.searchFilter.emit(value)
                this.onChange(value || '')
            })
    }

    clearSearchInput() {
        this.searchControl.setValue('')
    }

    ngOnDestroy() {
        this.endSubs$.next()
        this.endSubs$.complete()
    }
}
