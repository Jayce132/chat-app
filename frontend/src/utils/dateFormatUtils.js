export const formatDate = (date) => {
    const arr = date.split("-");
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month_index = parseInt(arr[1], 10) - 1;

    // console.log("The current month is " + months[month_index]);
    if (isToday(new Date(date))) {
        const minutes = differenceMinutes(new Date(date));
        if (minutes < 60) {
            if (minutes === 1) {
                return '1 minute ago';
            } else if (minutes < 1) {
                return "less than a minute ago";
            } else {
                return `${minutes} minutes ago`;
            }

        } else if (minutes => 60 || minutes < 120) {
            return '1 hour ago';
        }

        const hours = parseInt(minutes / 60);
        return `${hours} hours ago`;
    }

    return `${new Date(date).getDate()} ${months[month_index]}`;
}

export const isToday = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();

}

export const differenceMinutes = (date) => {
    const today = new Date();
    let dif = (today - date);
    dif = Math.round((dif / 1000) / 60);
    return dif;
}