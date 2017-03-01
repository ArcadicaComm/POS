/* 
 Service use to check the table is chosen or not
 */
posApp.service('checkTable', function(){
    this.status = 0;
    this.changeTableStatus  =   0; //To display changeTable 
    this.currentTableId     =   0;
    this.currentTableTitle  =   '';
    this.confirmChangeTable =   0;
    this.new_table;
    this.chooseTable = function()
    {
        this.status = 1;
        this.changeTableStatus = 1;
    };
    this.cancelTable = function()
    {
        this.status = 0;
        this.changeTableStatus = 0;
    };
    this.setCurrentTable = function(currentTableId, currentTableTitle)
    {
        this.currentTableId     =   currentTableId;
        this.currentTableTitle  =   currentTableTitle
    };
    this.changeTable = function(new_table_id){
        this.confirmChangeTable = 1;
        this.new_table = new_table_id;
    };
})