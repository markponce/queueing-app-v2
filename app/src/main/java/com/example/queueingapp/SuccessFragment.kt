package com.example.queueingapp

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.example.queueingapp.databinding.FragmentStepOneBinding
import com.example.queueingapp.databinding.SuccessFragmentBinding

class SuccessFragment : Fragment() {

    companion object {
        fun newInstance() = SuccessFragment()
    }

    private lateinit var viewModel: SuccessViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val binding = DataBindingUtil.inflate<SuccessFragmentBinding>(
            inflater,
            R.layout.success_fragment,
            container,
            false
        )
        val networkQueueResponse = SuccessFragmentArgs.fromBundle(arguments!!).networkQueueResponse
        viewModel = ViewModelProviders.of(this, SuccessViewModel.Factory(networkQueueResponse)).get(SuccessViewModel::class.java)

//        binding.viewModel
        binding.viewModel = viewModel



        viewModel.queue.observe(this.viewLifecycleOwner, Observer {

            if(it == null) {
                findNavController().navigate(SuccessFragmentDirections.actionSuccessFragmentToStepOneFragment())
            }
        })


        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
    }

}