package com.example.queueingapp

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import com.example.queueingapp.databinding.FragmentStepOneBinding
import timber.log.Timber

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [StepOneFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class StepOneFragment : Fragment() {

    private lateinit var viewModel: QueueViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val binding = DataBindingUtil.inflate<FragmentStepOneBinding>(
            inflater,
            R.layout.fragment_step_one,
            container,
            false
        )

        viewModel = ViewModelProvider(this.requireActivity()).get(QueueViewModel::class.java)
        binding.queueViewModel = viewModel
        binding.lifecycleOwner = viewLifecycleOwner
        binding.editTextName.requestFocus()

//        viewModel.name.observe(this.viewLifecycleOwner, Observer {
//            Timber.d(it)
//        })



        binding.btnStepTwo.setOnClickListener { view: View ->
            view.findNavController()
                .navigate(StepOneFragmentDirections.actionStepOneFragmentToStepTwoFragment())
        }

        return binding.root
    }

}