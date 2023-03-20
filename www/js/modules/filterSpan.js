
export default (text) => {
    let span = text?.split('ﷺ')?.join('<span style="color: #b62b2b;">ﷺ</span>')
        ?.split('عَزَّ وَجَلَّ')?.join('<span style="color: #b62b2b;">عَزَّ وَجَلَّ</span>')
        ?.split('ﷻ')?.join('<span style="color: #b62b2b;">ﷻ</span>')
        ?.split('الله')?.join('<span style="color: #b62b2b;">الله</span>')
        ?.split('اللَّٰه')?.join('<span style="color: #b62b2b;">اللَّٰه</span>')
        ?.split('سُبْحَانَهُ وَتَعَالَى')?.join('<span style="color: #b62b2b;">سُبْحَانَهُ وَتَعَالَى</span>')
        ?.split('عليه السلام')?.join('<span style="color: #b62b2b;">عليه السلامﷺ</span>')
        ?.split('رضي الله عنه')?.join('<span style="color: #b62b2b;">رضي الله عنه</span>')
        ?.split('(')?.join('<span style="color: #797979;">(')?.split(')')?.join(')</span>')
        ?.split('﴿')?.join(' <span style="color: #7f8862;">﴿')?.split('﴾')?.join('﴾</span>')
        ?.split('«')?.join('<span style="color: #6bc077;">«')?.split('»')?.join('»</span>');

    return span
}