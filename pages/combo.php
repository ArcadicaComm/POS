<div class="row" ng-repeat="combo in combos" style="margin-top: 10px">
    <div class="col-sm-12">
        <div class="col-sm-2 col-sm-offset-1">
            <img ng-src="http://webbase.com.vn/pos{{ combo.image }}" width="150px" height="150px"/>
        </div>

        <div class="col-sm-9">
            <div class="col-sm-12" style="font-weight: bold; font-size: 18px; margin: 30px 0px 0px 15px">
                {{ combo.title }} - ${{ combo.price }}
            </div>

            <div class="col-sm-12" ng-repeat="ci in combos_items" ng-if="ci.combo_id == combo.combo_id" style="margin-left: 15px">
                {{ ci.item.title }} x {{ ci.quantity }}
            </div>
        </div>
    </div>
</div>