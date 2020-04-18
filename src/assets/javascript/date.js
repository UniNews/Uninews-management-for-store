var moment = require('moment');

var monthNamesThai = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', ' ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

export function convertTimestamptoDate(timestamp) {
    const moments = new moment(timestamp)
    if (moments.isSame(new Date(), 'day')) {
        return moments.startOf('minute').fromNow()
    } else {
        return moments.calendar(null, {
            lastDay: '[เมื่อวาน] HH:mm',
            lastWeek: 'DD ' + monthNamesThai[moments.month()] + ' เวลา HH:mm',
            sameElse: 'DD ' + monthNamesThai[moments.month()] + ' เวลา HH:mm'
        })
    }
}