import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray,NgForm,NgControl, Form } from '@angular/forms'
// import { Camera, CameraOriginal } from '@ionic-native/camera';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { WaybillService } from 'src/app/service/waybill.service';

@Component({
  selector: 'app-add-pod',
  templateUrl: './add-pod.component.html',
  styleUrls: ['./add-pod.component.scss'],
})
export class AddPodComponent implements OnInit {
  waybillForm: FormGroup;
  myDate = new Date();
  scanData: any;
  formData = new FormData();
  cameraOpt: boolean =false;
  fileOpt: boolean =false;
  uploadfile: any;
  constructor(private fb:FormBuilder, public camera : Camera, private scanner : BarcodeScanner, private service : WaybillService) { }

  ngOnInit() {

    this.waybillForm = this.fb.group({
      waybill_no : [''],
      pod_date :[''],
      pod_file :['']
      
    })
  }
  disabledDates: Date[] = [];
  
  datePickerObj: any = {
    inputDate: new Date(), // default new Date()
    fromDate: new Date(), // default null
    toDate: new Date('2100-12-31'), // default null
    showTodayButton: true, // default true
    closeOnSelect: true, // default false
    disableWeekDays: [], // default []
    mondayFirst: true, // default false
    setLabel: 'Select',  // default 'Set'
    todayLabel: 'Today', // default 'Today'
    closeLabel: 'Close ', // default 'Close'
    disabledDates: this.disabledDates, // default []
    titleLabel: 'Select a Date', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton: false, // default true
    momentLocale: 'pt-BR', // Default 'en-US'
    yearInAscending: true, // Default false
    btnCloseSetInReverse: true, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    },
    arrowNextPrev: {
      nextArrowSrc: 'assets/images/arrow_right.svg',
      prevArrowSrc: 'assets/images/arrow_left.svg'
    }, // This object supports only SVG files.
    highlightedDates: [
      { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
      { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
    ], // Default [],
    isSundayHighlighted: {
      fontColor: '#ee88bf' // Default null
    } // Default {}
  };

  get f() { return this.waybillForm.controls; }

  userImg: any = '';
  base64Img = '';
  cameraOptions: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    // allowEdit: true
  }
  uploadtype='';
  openCamera() {
    this.uploadtype='cameraUpload';
    this.cameraOpt = false;
    this.fileOpt = true;
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
    console.log('image data =>  ', imgData);
    this.base64Img = 'data:image/jpeg;base64,' + imgData;
    this.userImg = this.base64Img;
    // console.log(this.userImg)
    }, (err) => {
    console.log(err);
    })
   }
  scan() {
    this.scanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scanData = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  fileChange(event) {
    this.uploadtype ='fileUpload';
    this.cameraOpt = true;
    this.fileOpt = false;
    console.log(event)
       const reader1 = new FileReader();
       if (event.target.files && event.target.files.length) {
         const [file] = event.target.files;
         this.uploadfile = event.target.files[0];
        //  formData.append('podFile', file, file.name);
         reader1.readAsDataURL(file);
        //  this.userImg = reader1.result;

       
         console.log(reader1)
         reader1.onload = () => {
           this.userImg = reader1.result
         };
       }
     }
   
  submit()
  {
    // console.log(this.waybillForm.value,this.scanData)
    // const formData = new FormData();
    // formData.append('waybill_no',this.scanData);
    // formData.append('pod_date',this.waybillForm.get('pod_date').value);
    // formData.append('pod_image',this.userImg);
    // formData.append('podFile',this.uploadfile,this.uploadfile.name);
    // formData.append('uploadtype',this.uploadtype)
    // console.log(formData)
    // let podData={waybill_no : this.scanData,pod_date:this.waybillForm.get('pod_date').value,pod_image:this.userImg}
    this.service.addPod({waybill_no:this.scanData,pod_date:this.waybillForm.get('pod_date').value,pod_image:this.userImg}).subscribe((res: any) => {
      if (res.success) {
        
      }
    });

    
  }
}
