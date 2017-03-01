posApp.service('checkFood', function(){
    this.status = 0;
    this.chooseFood = function()
    {
        this.status = 1;
    }
    this.cancelFood = function()
    {
        this.status = 0;
    }
})


