package com.example.queueingapp.domain

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

//data class CustomerType(
//    val id: Int,
//    val title: String
//)

@Parcelize
data class QueueService(
    val id: String,
    val name: String,
    val description: String,
) : Parcelable {

}

//@Parcelize
//data class Queue(
//    val id: String,
//    val name: String,
//    val description: String,
//) : Parcelable {
//
//}





