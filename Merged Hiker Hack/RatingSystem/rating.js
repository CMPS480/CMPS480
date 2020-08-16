function onpageLoad() {

    ratings = {
        appalachiantrail: 1.5,
        billygoattrail: 2.5,
        sugarloafmountain: 0.5,
        catoctinmountainpark: 5,
        penmarpark: 4
    }
    table = document.querySelector('.table')
    totalStar = 5;
    for (rating in ratings) {
        //console.log(rating);
        //console.log(ratings);
        //get values
        //console.log(ratings[rating])

        starPercentage = (x / totalStar * 100)
            //console.log('percentages' + starPercentage) 
        starRounded = Math.round(starPercentage / 10) * 10 + '%';
        //console.log(starRounded);
        innerStar = table.querySelector(' .${rating} .inner-star');
        numberRatings = table.querySelector(' .${rating} .numberRating');

        innerStar.style.width = starRounded;
        numberRatings.innerText = ratings[rating];

    }

}