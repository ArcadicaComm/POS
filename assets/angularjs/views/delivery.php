<style>
@media (min-width: 1200px)
{
    #content {
        width: 80% !important;
     }
}
    
</style>
<!--<ul class="nav nav-tabs">
  <li><a data-toggle="tab" href="#/">Table list</a></li>
  <li><a data-toggle="tab" href="#takeaway">Take away</a></li>
  <li  class="active"><a data-toggle="delivery" href="#menu1">Delivery</a></li>
</ul>

<div class="tab-content">
  <div id="home" class="tab-pane fade in active">
    <h3>HOME</h3>
    <p>Some content.</p>
  </div>
  <div id="menu1" class="tab-pane fade">
    <h3>Menu 1</h3>
    <p>Some content in menu 1.</p>
  </div>
</div>-->
<a href="#/" class="btn btn-default col-sm-4 col-md-4 col-lg-4 col-xs-4">Table List</a>
<a href="#takeaway" class="btn btn-default col-sm-4 col-md-4 col-lg-4 col-xs-4">Take away</a>
<a href="#delivery" class="btn btn-primary col-sm-4 col-md-4 col-lg-4 col-xs-4">Delivery</a>
<br><br>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-6 col-sm-12 col-xs-12">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img ng-src="{{ baseUrl }}/img/delivery.png" width="100px"/>
                        </td>
                        <td style="padding-left: 30px;">
                            Code <span style="float:right">:</span><br>
                            Customer <span style="float:right">:</span><br>
                            Detail <span style="float:right">:</span><br>
                            Start time <span style="float:right">:</span>
                        </td>
                        
                        <td>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="col-md-6 col-sm-12 col-xs-12">
            <button class="btn btn-primary col-md-12 col-sm-12 col-xs-12" data-toggle="collapse" data-target="#customer" style="margin-bottom : 20px !important">Add items</button>
            <div id="customer" class="collapse">
                <div class="panel panel-primary">
                    <div class="panel-heading">Customer info</div>
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="name">Customer name:</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter customer name">
                            </div>
                            <div class="form-group">
                                <label for="telephone">Customer phone:</label>
                                <input type="text" class="form-control" id="telephone" placeholder="Enter customer telephone number">
                            </div>
                            
                            <div class="form-group">
                                <button style="float:right" class="btn btn-default"><i class="glyphicon glyphicon-save"></i>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>