import {Cart} from "./cart";
import {Transaction} from "./transaction";
import {Project} from "./project";

export class ChartLine{
  private  quantity : number = 0;
  private chart : Cart = new Cart();
  private project :Project = new Project();
}
