package com.example.queueingapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.LiveData
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.queueingapp.databinding.ServiceItemBinding
import com.example.queueingapp.domain.QueueService
import kotlinx.android.synthetic.main.service_item.view.*


class ServicesAdapter(private val selectedServices: LiveData<List<QueueService>>, private val onClickListener: ServicesAdapter.OnClickListener) :
    ListAdapter<QueueService, ServicesAdapter.ServicesViewHolder>(ServicesAdapter.DiffCallBack) {
    class ServicesViewHolder(private var binding: ServiceItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(service: QueueService) {
            binding.service = service
            // This is important, because it forces the data binding to execute immediately,
            // which allows the RecyclerView to make the correct view size measurements
            binding.executePendingBindings()
        }
    }

    companion object DiffCallBack : DiffUtil.ItemCallback<QueueService>() {
        override fun areItemsTheSame(oldItem: QueueService, newItem: QueueService): Boolean {
            return oldItem === newItem
        }

        override fun areContentsTheSame(oldItem: QueueService, newItem: QueueService): Boolean {
            return oldItem.id == newItem.id
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ServicesViewHolder {
        return ServicesViewHolder(ServiceItemBinding.inflate(LayoutInflater.from(parent.context)))
    }

    override fun onBindViewHolder(holder: ServicesViewHolder, position: Int) {
        val service = getItem(position)
        holder.itemView.cb_service_item.isChecked = false
        if(selectedServices.value?.contains(service) == true) {
            holder.itemView.cb_service_item.isChecked = true
        }
//        holder.itemView.setOnClickListener {
//            onClickListener.onClick(service)
//        }
        holder.itemView.cb_service_item.setOnClickListener {
            onClickListener.onClick(it, service)
        }
        holder.bind(service)
    }


//    class OnClickListener(val clickListener: (service: QueueService) -> Unit) {
//        fun onClick(service: QueueService) = clickListener(service)
//    }
    class OnClickListener(val clickListener: (view: View, service: QueueService) -> Unit) {
       fun onClick(view: View, service: QueueService) = clickListener(view, service)
    }



}