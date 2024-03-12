import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allStudents: any[], searchKey: string): any[] {
    const result :any = []
    if(!allStudents || searchKey==""){
      return allStudents;
    }
    allStudents.forEach((item:any)=>{
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
