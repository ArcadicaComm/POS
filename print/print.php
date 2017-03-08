<?php
use yii\easyii\modules\page\api\Page;
use yii\easyii\modules\shopcart\api\Shopcart;
use yii\helpers\Html;
$asset = \app\assets\PrintAsset::register($this);
$page = Page::get('page-shopcart-print');
$base = Yii::$app->getUrlManager()->getBaseUrl();
$this->title = 'Success!';
$this->params['breadcrumbs'][] = $page->model->title;
?>
<div class="row">
    <div class="col-md-12">
       <div id="page-wrap">
            <?php
          
                foreach ($bills as $bill):
            ?>        
                
		<center><h1> Invoice </h1></center>
		
		<div id="identity">
		
            <div id="address">Chris Coyier
123 Appleseed Street
Appleville, WI 53719

Phone: (555) 555-5555</div>

            <div id="logo">

            

             
                <img id="image" src="<?=$base?>/img/logo.png" alt="logo" width="70%" />
            </div>
		
		</div>
		
		<div style="clear:both"></div>
		
		<div id="customer">
               <div id="meta" style="float: left;">
                <div>
                    
                    <h3><?=$bill['first_name']?> <?=$bill['last_name']?></h3><br/>(discout <?=$bill['discount_percent']?>%) <br/><?=$bill['tel']?>
                </div>
                
               

            </div>
          
                    
            <table id="meta">
                <tr>
                    <td class="meta-head">Invoice #</td>
                    <td><textarea>000<?=$bill['sale_id']?></textarea></td>
                </tr>
                <tr>

                    <td class="meta-head">Date</td>
                    <td><textarea id="date"><?=Yii::$app->formatter->asDatetime($bill['time'],"php:d-m-Y");?></textarea></td>
                </tr>
                <tr>

                    <td class="meta-head">Payment method</td>
                    <td><textarea id="date"><?=$bill['payment']?></textarea></td>
                </tr>
                <tr>
                    <td class="meta-head">Amount Due</td>
                    <td><div class="due">$<?=$bill['total']?></div></td>
                </tr>

            </table>
		
		</div>
		  <?php        
	 endforeach;
        ?>
                
                
		<table id="items">
		
		  <tr>
		      <th>Item</th>
		      <th>Description</th>
		      <th>Unit Cost</th>
		      <th>Quantity</th>
		      <th>Price</th>
		  </tr>
		  <?php
                    foreach ($bill_items as $item):
                      if ($item->item_id){  
                        $item_name = yii\easyii\modules\catalog\models\Item::find()->where('item_id ='.$item->item_id)->andWhere('item_id > 0')->one()->title;
                      }
                      
                      if($item->combo_id){
                        $item_name = \app\modules\combo\models\Combo::find()->where(['combo_id'=>$item->combo_id])->andWhere('combo_id > 0')->one()->title;  
                      }  
                        $price = $item->price * $item->count;
                   ?>
		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea><?=$item_name?></textarea></div></td>
		      <td class="description"><textarea></textarea></td>
		      <td><textarea class="cost"><?=$item->price?></textarea></td>
		      <td><textarea class="qty"><?=$item->count?></textarea></td>
		      <td><span class="price"><?=$price?></span></td>
		  </tr>
		  <?php
                   endforeach;
                  ?>
		  
		  
		
		  
		  <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">TAX</td>
		      <td class="total-value"><div id="subtotal">10%</div></td>
		  </tr>
                  
                  <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Discout</td>
		      <td class="total-value"><div id="subtotal"><?=$bill['discount_percent']?>%</div></td>
		  </tr>
		  <tr>

		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Total</td>
		      <td class="total-value"><div id="total">$<?=$bill['total']?></div></td>
		  </tr>
                  <?php
                    if ($bill['payment']=='Cash'){
                  ?>
		  <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Received</td>

		      <td class="total-value"><textarea id="paid">$<?=$bill['received']?></textarea></td>
		  </tr>
		  <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line balance">Balance Due</td>
		      <td class="total-value balance"><div class="due">$<?=$bill['received']-$bill['total']?></div></td>
		  </tr>
		<?php
                    }
                ?>
		</table>
		
		<div id="terms">
		  <h5>Terms</h5>
		  <textarea>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</textarea>
		</div>
                <?php if ($bill['table_id']): ?>
                <?= Html::a('Finish', ['/shopcart/finish/'.$bill['table_id'].'?method=table '], ['class'=>'btn btn-primary','style'=>'width:100%']) ?>
                <?php endif; ?>
                
                <?php if ($bill['takeaway_id']): ?>
                <?= Html::a('Finish', ['/shopcart/finish/'.$bill['takeaway_id'].'?method=takeaway '], ['class'=>'btn btn-primary','style'=>'width:100%']) ?>
                <?php endif; ?>
                
                <?php if ($bill['delivery_id']): ?>
                <?= Html::a('Finish', ['/shopcart/finish/'.$bill['delivery_id'].'?method=delivery '], ['class'=>'btn btn-primary','style'=>'width:100%']) ?>
                <?php endif; ?>
        
	</div>
       
             
         
        
    </div>
</div>    