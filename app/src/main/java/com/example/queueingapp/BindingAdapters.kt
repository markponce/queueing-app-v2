package com.example.queueingapp

import android.view.View
import android.widget.CheckBox
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.queueingapp.domain.QueueService

@BindingAdapter("listData")
fun bindRecyclerView(recyclerView: RecyclerView, data: List<QueueService>?) {
    val adapter = recyclerView.adapter as ServicesAdapter
    adapter.submitList(data)
}

//@BindingAdapter("time")
//fun setChcked(view: View, value: Boolean) {
//    // Important to break potential infinite loops.
////    if (view.time != newValue) {
////        view.time = newValue
////    }
//    val new = view as CheckBox
//    new.isChecked = !value
//
//}