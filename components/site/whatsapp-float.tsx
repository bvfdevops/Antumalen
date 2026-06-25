"use client";

import { motion } from "framer-motion";
import { WhatsappIcon } from "@/components/site/icons";
import { buildWhatsappLink } from "@/lib/data";

export function WhatsappFloat() {
  return (
    <motion.a
      href={buildWhatsappLink("Hola Antümalen, quiero hacer un pedido.")}
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/30"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30" />
      <WhatsappIcon className="relative size-7" />
    </motion.a>
  );
}
