import { motion, AnimatePresence } from 'framer-motion';

import './modal.scss';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
    classname: string;
}

const Modal = (props: ModalProps) => {
    return (
        <AnimatePresence>
            {props.isOpen && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='backdrop'
                onClick={props.onClose}
                >
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className={props.classname}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {props.children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;